uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.37 + 0.19 * sin(t * 1.29)) + vec2(-0.38, -0.11) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.54) * 1.28), cos((time * 0.54) * 1.43)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.82 / 3.1415927, 0.52 / r - (time * 0.54) * 2.39);
	float d = field(tv, (time * 0.54), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.49, 0.45, 0.47) + vec3(0.06, 0.05, 0.04);
	col *= clamp(r * 2.35, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.059, 0.980, 0.929) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
