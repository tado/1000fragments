uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 21.54 - t * 7.76 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 15.74 - t * 7.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	{ p = vec2(atan(p.y, p.x) * 1.45, length(p) * 3.33 - time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.08, vec3(0.52, 0.59, 0.57), vec3(0.45, 0.33, 0.36), vec3(0.79, 1.29, 0.98), vec3(0.35, 0.85, 0.33));
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
