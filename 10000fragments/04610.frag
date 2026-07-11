uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 11.49 - t * 4.28 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 11.13 - t * 4.28 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.56) - 0.5;
	p *= 3.21;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.23, length(p) * 3.10 - time * 0.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.17, vec3(0.58, 0.59, 0.51), vec3(0.39, 0.36, 0.47), vec3(0.87, 1.25, 1.04), vec3(0.75, 0.58, 0.81));
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
