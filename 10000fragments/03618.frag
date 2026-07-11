uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.94) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 1.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.23, vec3(0.54, 0.46, 0.44), vec3(0.45, 0.37, 0.36), vec3(1.36, 1.22, 0.92), vec3(0.03, 0.25, 0.78));
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
