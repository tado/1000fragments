uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.22 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.07 + t * 1.43 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.85 + (time * 0.50) * 0.53) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.33 / 3.1415927, 0.75 / r - (time * 0.50) * 1.59);
	tv.x += tv.y * 0.21;
	float d = field(tv, (time * 0.50), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.57, 0.55, 0.41) + vec3(0.09, 0.07, 0.11);
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.977, 0.998) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
