uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.76 + 0.29 * sin(t * 0.69)) + vec2(-0.56, -0.00) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.78;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.62) * 0.55));
	p = sin(p * 1.84 + (time * 0.62) * 0.89) * 0.66;
	float d = field(p, (time * 0.62), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.64, 0.60, 0.57) + vec3(0.06, 0.06, 0.07);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.983, 1.052) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
