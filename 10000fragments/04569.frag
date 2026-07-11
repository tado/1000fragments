uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 26.38 - t * 3.07 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 30.56 - t * 3.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.93) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.18, vec3(0.52, 0.47, 0.44), vec3(0.31, 0.44, 0.31), vec3(0.88, 1.13, 0.78), vec3(0.02, 0.71, 0.08));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
