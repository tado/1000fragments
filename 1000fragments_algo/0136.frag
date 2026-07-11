uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.78 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.97 + t * 1.41 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.66;
	float d = field(p, (time * 0.52), 0.0);
	vec3 col = palette(d * 1.03 + (time * 0.52) * 0.00, vec3(0.42, 0.41, 0.37), vec3(0.18, 0.20, 0.22), vec3(0.63, 0.59, 0.71), vec3(0.90, 0.87, 0.12));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.942, 0.996) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
