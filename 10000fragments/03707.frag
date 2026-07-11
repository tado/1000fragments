uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.84) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 0.64 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.16, vec3(0.59, 0.50, 0.54), vec3(0.43, 0.37, 0.38), vec3(0.81, 1.10, 1.32), vec3(0.47, 0.24, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
