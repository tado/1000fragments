uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.19 - t * 8.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.80) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.15, vec3(0.58, 0.54, 0.53), vec3(0.39, 0.31, 0.42), vec3(1.13, 0.84, 1.09), vec3(0.34, 0.62, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
