uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.29 + sin(p.y * 5.36 + t * 4.84) * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(0.76) * p; }
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	p *= 1.63;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.03, vec3(0.46, 0.57, 0.40), vec3(0.33, 0.46, 0.43), vec3(0.93, 0.95, 1.33), vec3(0.22, 0.73, 0.26));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
