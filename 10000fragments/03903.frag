uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 25.95 - t * 1.17 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 15.59 - t * 1.17 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.64;
	{ p = vec2(atan(p.y, p.x) * 1.51, length(p) * 4.79 - time * 0.28); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.17, vec3(0.49, 0.47, 0.41), vec3(0.42, 0.38, 0.43), vec3(1.32, 1.31, 1.04), vec3(0.91, 0.41, 0.20));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
