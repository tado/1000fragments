uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 26.59 - t * 6.90 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 28.88 - t * 6.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.07, vec3(0.51, 0.59, 0.54), vec3(0.34, 0.34, 0.43), vec3(0.91, 1.32, 0.88), vec3(0.55, 0.28, 0.40));
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
