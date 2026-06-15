uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.51) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p = rot2(length(p) * -1.38 + time * 0.85) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.43 * p.y + time * 1.74); p.y += 0.21 / wf * cos(wf * 2.60 * p.x + time * 0.89); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.19, vec3(0.54, 0.58, 0.45), vec3(0.48, 0.40, 0.40), vec3(0.72, 0.87, 1.16), vec3(0.50, 0.66, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
