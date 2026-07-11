uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 22.98 - t * 3.09 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 34.02 - t * 2.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	p = (floor(p * 17.1) + 0.5) / 17.1;
	p = abs(p);
	p += vec2(0.87, -0.80) * sin(length(p) * 2.95 - time * 2.44) * 0.22;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.51));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
