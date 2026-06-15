uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.70) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 1.27 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	p *= 2.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.06, vec3(0.46, 0.58, 0.55), vec3(0.32, 0.30, 0.48), vec3(0.87, 1.02, 1.16), vec3(0.83, 0.34, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
