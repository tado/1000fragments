uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.02 + sin(p.y * 1.80 + t * 3.67) * 1.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.27, length(p) * 3.57 - time * 0.22); }
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.19, vec3(0.58, 0.42, 0.53), vec3(0.49, 0.39, 0.43), vec3(0.83, 1.36, 0.98), vec3(0.61, 0.30, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
