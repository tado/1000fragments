uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.25 + 0.45 * sin(t * 1.31)) + vec2(-0.69, 0.23) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.71) * 1.04), cos((time * 0.71) * 0.72)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.26 / 3.1415927, 0.92 / r + (time * 0.71) * 2.53);
	float d = field(tv, (time * 0.71), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.46, 0.56, 0.60) + vec3(0.12, 0.07, 0.09);
	col *= clamp(r * 1.79, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.983, 0.921) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
