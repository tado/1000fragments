uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 2.44 * sin(t * 0.90) + t * 3.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	p = rot2(time * 1.23) * p;
	p.y += sin(p.x * 7.58 + time * 1.82) * 0.29;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.44; p = rot2(2.54) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.13, vec3(0.43, 0.54, 0.56), vec3(0.35, 0.46, 0.39), vec3(0.75, 0.72, 0.85), vec3(0.24, 0.69, 0.88));
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 2.82 + time * 16.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
