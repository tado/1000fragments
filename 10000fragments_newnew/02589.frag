uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.21 * pow(abs(cos(ra * 2.0 + t * 1.63)), 1.91);
    v = sin((rr - pet) * 20.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(0.54) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.25, vec3(0.50, 0.43, 0.51), vec3(0.41, 0.37, 0.36), vec3(0.95, 1.20, 1.33), vec3(0.78, 0.06, 0.95));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.95 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
