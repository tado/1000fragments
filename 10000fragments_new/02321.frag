uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 8.90 - t * 1.34 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 23.89 - t * 7.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	p = (floor(p * 25.0) + 0.5) / 25.0;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.10, vec3(0.59, 0.55, 0.46), vec3(0.40, 0.45, 0.32), vec3(1.29, 0.82, 1.23), vec3(0.81, 0.44, 0.03));
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
