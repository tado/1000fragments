uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.61 + ga * 5.0 - t * 2.25 + ph);
    v = arm * exp(-gr * 1.35);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.19; p = rot2(1.53) * p; }
	p = fract(p * 1.79) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.19, vec3(0.42, 0.51, 0.57), vec3(0.32, 0.43, 0.46), vec3(0.89, 0.78, 0.71), vec3(0.85, 0.51, 0.96));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.34 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
