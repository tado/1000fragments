uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 32.30 - t * 5.42 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 21.40 - t * 5.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.24, vec3(0.50, 0.43, 0.48), vec3(0.40, 0.32, 0.33), vec3(1.12, 1.35, 1.02), vec3(0.30, 0.86, 0.72));
	col = mod(col * 1.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
