uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.22 * sin(mf + 3.0) + ph), cos(t * 1.22 * cos(mf + 3.0) + ph));
        ms += 0.059 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p = rot2(2.33) * p;
	p += vec2(0.75, 0.97) * sin(length(p) * 5.92 - time * 0.53) * 0.12;
	p = rot2(length(p) * 1.62 + time * 0.86) * p;
	p = rot2(p.y * 1.16 + time * 0.87) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.33, 0.08, 0.23), vec3(0.92, 0.92, 0.91), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
