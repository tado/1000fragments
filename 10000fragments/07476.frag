uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.82) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 1.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.94;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.00, vec3(0.54, 0.48, 0.44), vec3(0.44, 0.37, 0.48), vec3(1.34, 1.23, 1.30), vec3(0.88, 0.98, 0.20));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
