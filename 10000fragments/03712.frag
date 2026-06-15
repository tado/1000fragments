uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 19.74 - t * 2.91 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 15.40 - t * 2.91 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	p = abs(p) - 0.38;
	{ p = vec2(atan(p.y, p.x) * 1.31, length(p) * 2.32 - time * 0.39); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.07, vec3(0.54, 0.45, 0.49), vec3(0.49, 0.49, 0.44), vec3(0.99, 0.87, 1.17), vec3(0.86, 0.15, 0.10));
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
