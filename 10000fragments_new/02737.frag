uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.39 + t * 4.96 + ph) + sin(p.y * 7.32 - t * 4.96 + ph)
        + sin((p.x + p.y) * 9.77 + t * 4.96 + ph) + sin(length(p) * 9.64 - t * 4.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.05, vec3(0.54, 0.50, 0.44), vec3(0.35, 0.34, 0.36), vec3(0.93, 1.28, 0.80), vec3(0.43, 0.24, 0.02));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
