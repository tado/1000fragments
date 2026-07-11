uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.74) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.24, vec3(0.47, 0.44, 0.52), vec3(0.45, 0.45, 0.49), vec3(0.80, 1.04, 1.13), vec3(0.67, 0.04, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
