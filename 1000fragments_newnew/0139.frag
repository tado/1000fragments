uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.15 + t * 1.03) - 0.5) * 2.0;
    v = sin((p.y * 7.91 + zx * 1.12 + t * 1.93) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	float d = field(p, (time * 0.57), 0.0);
	vec3 col = palette(d * 0.65 + (time * 0.57) * 0.16, vec3(0.29, 0.41, 0.33), vec3(0.23, 0.19, 0.25), vec3(0.74, 0.75, 0.52), vec3(0.17, 0.03, 0.75));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 0.983, 1.020) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
