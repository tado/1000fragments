uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.72 + t * 1.86 + ph) + sin(p.y * 5.73 - t * 2.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.86 + sr * 15.57 - t * 1.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(2.37) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.21);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.15, vec3(0.56, 0.51, 0.50), vec3(0.48, 0.43, 0.46), vec3(0.75, 1.33, 1.36), vec3(0.30, 0.90, 0.49));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
