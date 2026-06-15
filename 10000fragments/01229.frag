uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 22.31 - t * 4.56 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 38.04 - t * 4.56 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	p += vec2(0.35, -0.46) * sin(length(p) * 5.31 - time * 1.23) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.15, vec3(0.60, 0.59, 0.49), vec3(0.32, 0.47, 0.50), vec3(0.87, 0.77, 0.75), vec3(0.38, 0.66, 0.84));
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
