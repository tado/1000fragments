uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.92 + 0.13 * sin(t * 0.40)) + vec2(-0.46, 0.14) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.67) * 1.40), cos((time * 0.67) * 0.82)) * 0.28;
	float an = atan(p.y, p.x) + (time * 0.67) * -0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.20 / 3.1415927, 1.28 / r - (time * 0.67) * 1.07);
	float d = field(tv, (time * 0.67), 0.0);
	vec3 col = palette((d) * 0.89 + (time * 0.67) * 0.03, vec3(0.47, 0.43, 0.47), vec3(0.31, 0.26, 0.23), vec3(0.55, 0.81, 0.56), vec3(0.64, 0.94, 0.17));
	col *= clamp(r * 1.40, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.031, 0.996, 0.918) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
