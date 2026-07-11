uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 27.02 - t * 1.54 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 27.22 - t * 1.54 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.10, vec3(0.59, 0.51, 0.59), vec3(0.46, 0.45, 0.30), vec3(1.05, 1.27, 1.05), vec3(0.75, 0.48, 0.31));
	col = mod(col * 2.14, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
