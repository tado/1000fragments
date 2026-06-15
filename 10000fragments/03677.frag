uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 16.98 - t * 4.98 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 29.06 - t * 4.98 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.69, 0.73, 1.43) + vec3(0.20, 0.19, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
