uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 11.19 - t * 6.29 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 16.42 - t * 6.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.03, vec3(0.60, 0.49, 0.58), vec3(0.43, 0.39, 0.31), vec3(1.14, 0.76, 0.75), vec3(0.31, 0.55, 0.87));
	col = clamp((col - 0.5) * 1.42 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
