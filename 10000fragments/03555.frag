uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.66) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 3.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.95 * p.y + time * 1.47); p.y += 0.33 / wf * cos(wf * 2.16 * p.x + time * 1.01); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.13, vec3(0.51, 0.41, 0.53), vec3(0.31, 0.37, 0.36), vec3(1.04, 1.37, 0.89), vec3(0.29, 0.07, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
