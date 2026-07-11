uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.98 + vec2(t * 1.86, -t * 1.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(1.70) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.02, vec3(0.51, 0.42, 0.55), vec3(0.46, 0.35, 0.34), vec3(0.94, 0.71, 1.20), vec3(0.37, 0.98, 0.48));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
