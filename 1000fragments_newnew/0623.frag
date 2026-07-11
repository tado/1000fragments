uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.46 * sin(mf + 3.0) + ph), cos(t * 2.25 * cos(mf + 3.0) + ph));
        ms += 0.029 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 7.44 + (time * 0.56) * 3.84) * 0.33;
	p += vec2(0.96, 0.09) * sin(length(p) * 2.01 - (time * 0.56) * 1.59) * 0.38;
	float d = field(p, (time * 0.56), 0.0);
	vec3 col = palette(d * 0.43 + (time * 0.56) * 0.02, vec3(0.40, 0.35, 0.41), vec3(0.26, 0.27, 0.33), vec3(0.49, 0.42, 0.52), vec3(0.08, 0.56, 0.92));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 1.004, 0.992) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
