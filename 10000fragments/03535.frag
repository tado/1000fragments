uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.34) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.28 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.19, vec3(0.57, 0.59, 0.52), vec3(0.40, 0.43, 0.40), vec3(1.31, 0.79, 1.32), vec3(0.05, 0.28, 0.68));
	col = fract(col * 2.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
