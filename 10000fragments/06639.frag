uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.01 + sin(p.y * 1.46 + t * 1.26) * 1.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	{ p = vec2(atan(p.y, p.x) * 1.99, length(p) * 4.62 - time * 0.49); }
	p = fract(p * 1.93) - 0.5;
	p = abs(p) - 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.02, vec3(0.52, 0.46, 0.47), vec3(0.37, 0.39, 0.49), vec3(0.90, 0.91, 0.82), vec3(0.30, 0.92, 0.96));
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
