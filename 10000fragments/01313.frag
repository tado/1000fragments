uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.75 + sr * 20.22 - t * 1.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.15; p = rot2(1.60) * p; }
	p = fract(p * 2.41) - 0.5;
	p = rot2(time * -0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.06, vec3(0.45, 0.59, 0.44), vec3(0.40, 0.47, 0.50), vec3(1.00, 0.80, 0.96), vec3(0.83, 0.76, 0.79));
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
