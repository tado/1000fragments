uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.53 + sin(p.y * 3.51 + t * 5.42) * 2.55 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.20, t * 2.22 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	p = fract(p * 2.17) - 0.5;
	p *= 2.52;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.29; p = rot2(1.65) * p; }
	p = rot2(time * 0.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.71 + time * 0.05, vec3(0.48, 0.41, 0.44), vec3(0.41, 0.50, 0.41), vec3(1.09, 1.16, 0.97), vec3(0.16, 0.97, 0.07));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
