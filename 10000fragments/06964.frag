uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.42, t * 2.03 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	p += vec2(-0.15, -0.93) * sin(length(p) * 5.16 - time * 1.44) * 0.23;
	{ p = vec2(atan(p.y, p.x) * 1.00, length(p) * 5.86 - time * 0.56); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.36, 0.30, 0.16), vec3(0.95, 0.66, 0.49), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
