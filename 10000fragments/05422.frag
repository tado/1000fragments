uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.03) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 3.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p += vec2(-0.16, -0.91) * sin(length(p) * 3.27 - time * 2.19) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.21, vec3(0.56, 0.42, 0.55), vec3(0.38, 0.40, 0.47), vec3(0.93, 0.97, 0.85), vec3(0.18, 0.88, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
