uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.25 + t * 4.21 + ph) + sin(p.y * 9.60 - t * 4.21 + ph)
        + sin((p.x + p.y) * 3.49 + t * 4.21 + ph) + sin(length(p) * 8.06 - t * 4.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	float d = field(p, (time * 0.68), 0.0);
	vec3 col = palette(d * 0.47 + (time * 0.68) * 0.02, vec3(0.27, 0.25, 0.36), vec3(0.27, 0.19, 0.24), vec3(0.80, 0.65, 0.54), vec3(0.28, 0.83, 0.82));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.38 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.963, 1.003, 0.934) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
