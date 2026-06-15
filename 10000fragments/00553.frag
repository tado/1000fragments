uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 12.61 - t * 5.45 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 20.66 - t * 5.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.24, vec3(0.59, 0.55, 0.53), vec3(0.37, 0.49, 0.40), vec3(1.24, 0.82, 0.94), vec3(0.78, 0.79, 0.86));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
