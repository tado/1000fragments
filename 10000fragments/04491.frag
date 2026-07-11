uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 22.73 - t * 4.95 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 27.99 - t * 4.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.21, vec3(0.43, 0.45, 0.47), vec3(0.44, 0.33, 0.32), vec3(0.92, 0.79, 1.25), vec3(0.05, 0.35, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
