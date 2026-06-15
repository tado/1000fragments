uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 25.14 - t * 1.28 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 19.14 - t * 1.28 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.16, vec3(0.48, 0.54, 0.57), vec3(0.34, 0.46, 0.45), vec3(1.30, 0.73, 0.83), vec3(0.18, 0.32, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
