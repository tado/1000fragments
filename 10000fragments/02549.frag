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
    v = sin(sa * 5.01 + sr * 18.08 - t * 4.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(2.54) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.01, vec3(0.57, 0.41, 0.43), vec3(0.37, 0.46, 0.31), vec3(0.75, 1.21, 1.39), vec3(0.28, 0.75, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
