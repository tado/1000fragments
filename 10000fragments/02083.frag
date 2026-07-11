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
    v = sin(sa * 8.42 + sr * 16.88 - t * 3.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	p *= 3.08;
	p += vec2(0.85, -0.84) * sin(length(p) * 4.32 - time * 1.19) * 0.29;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.46; p = rot2(1.09) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.03, vec3(0.42, 0.51, 0.43), vec3(0.31, 0.35, 0.37), vec3(0.89, 1.14, 0.92), vec3(0.45, 0.69, 0.48));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
