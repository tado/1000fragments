uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 10.98 - t * 6.23 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 27.54 - t * 6.23 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.23, length(p) * 5.26 - time * 0.13); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.17, vec3(0.54, 0.47, 0.47), vec3(0.48, 0.35, 0.34), vec3(1.24, 1.27, 1.25), vec3(0.32, 0.98, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
