uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 25.22 - t * 7.29 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 13.37 - t * 7.29 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.93, t * 1.30 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	p = fract(p * 1.57) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 3.85 - time * 0.41); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.37 + time * 0.28, vec3(0.52, 0.58, 0.49), vec3(0.39, 0.43, 0.37), vec3(1.29, 1.23, 0.80), vec3(0.01, 0.65, 0.85));
	col = fract(col * 1.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
