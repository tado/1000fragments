uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 29.64 - t * 3.72 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 15.71 - t * 3.72 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.18, vec3(0.47, 0.47, 0.42), vec3(0.50, 0.31, 0.47), vec3(0.93, 0.90, 1.16), vec3(0.58, 0.16, 0.69));
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
