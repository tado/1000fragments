uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.97) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 3.74 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	p += vec2(-0.79, -0.54) * sin(length(p) * 3.07 - time * 1.65) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.24, vec3(0.46, 0.60, 0.52), vec3(0.41, 0.36, 0.47), vec3(0.90, 0.94, 0.72), vec3(0.03, 0.71, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
